import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { format, addMonths, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import AsyncSelect from 'react-select/async';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';
import { formatCurrencyBR } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

export default function FormRegistration() {
  const { idRegistration } = useParams();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [dateSelected, setDateSelected] = useState();

  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [planSelected, setPlanSelected] = useState();
  const [studentSelected, setStudentSelected] = useState([]);

  const loadRegistration = useCallback(async () => {
    await api
      .get('students')
      .then(response => {
        const listFormatted = response.data.map(item => ({
          value: item.id,
          label: item.name,
        }));

        setStudents(listFormatted);
      })
      .then(
        await api.get('plans').then(response => {
          setPlans(response.data);
        })
      );

    if (idRegistration) {
      setEdit(true);
      await api.get(`registrations/${idRegistration}`).then(response => {
        setStudentSelected(response.data.student.id);
        setDateSelected(response.data.start_date);
        setPlanSelected(response.data.plan.id);
      });
    }
  }, [idRegistration]);

  const dateSelectedFormatted = useMemo(
    () => dateSelected && format(parseISO(dateSelected), 'yyyy-MM-dd'),
    [dateSelected]
  );

  useEffect(() => {
    loadRegistration();
  }, [loadRegistration]);

  const filterStudents = inputValue => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsStudent = (inputValue, callback) => {
    callback(filterStudents(inputValue));
  };

  useEffect(() => {
    if (planSelected && plans) {
      // eslint-disable-next-line
      const indexPlan = plans.findIndex(plan => plan.id == planSelected);

      if (dateSelected) {
        setEndDate(
          format(
            addMonths(parseISO(dateSelected), plans[indexPlan].duration),
            'dd/MM/yyyy'
          )
        );
      }

      setTotalPrice(plans[indexPlan].price * plans[indexPlan].duration);
    }
    // eslint-disable-next-line
  }, [planSelected, dateSelected]);

  async function handleNew() {
    if (!studentSelected || !planSelected || !students || !dateSelected) {
      toast.warning('Você precisa selecionar aluno, plano e data início!');
    } else {
      try {
        await api.post('registrations', {
          student_id: studentSelected,
          plan_id: planSelected,
          start_date: parseISO(dateSelected),
        });
        toast.success('Matrícula ativada com sucesso!');
        history.goBack();
      } catch (_err) {
        toast.error(
          `Não foi possível ativar a matrícula! ${_err.response.data.error.message}`
        );
      }
    }
  }

  async function handleEdit() {
    if (!studentSelected || !planSelected || !students) {
      toast.warning('Você precisa selecionar aluno e plano!');
    } else {
      try {
        await api.put('registrations', {
          id: idRegistration,
          student_id: studentSelected,
          plan_id: planSelected,
          start_date: parseISO(dateSelected),
        });
        toast.success('Matrícula atualizada com sucesso!');
        history.goBack();
      } catch (_err) {
        toast.error(
          `Não foi possível atualizar a matrícula! ${_err.response.data.error.message}`
        );
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>{edit ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h1>
        <aside>
          <button
            className="return"
            type="button"
            onClick={() => history.goBack()}
          >
            <MdKeyboardArrowLeft color="#FFF" size={24} />
            VOLTAR
          </button>
          <button
            type="submit"
            form="form-plan"
            onClick={edit ? handleEdit : handleNew}
          >
            <MdCheck color="#FFF" size={24} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form id="form-plan">
          <div>
            <h3>ALUNO</h3>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptionsStudent}
              defaultOptions={students}
              placeholder="Buscar aluno..."
              onChange={option => setStudentSelected(option.value)}
              value={students.filter(
                option => option.value === studentSelected
              )}
            />
          </div>
          <div className="last-row">
            <div>
              <h3>PLANO</h3>
              <select
                onChange={e => setPlanSelected(e.target.value)}
                value={planSelected}
              >
                <option value="" disabled selected>
                  Selecione um plano
                </option>
                {plans.map(plan => (
                  <option value={plan.id}>{plan.title}</option>
                ))}
              </select>
            </div>
            <div>
              <h3>DATA DE INÍCIO</h3>
              <Input
                name="startDate"
                type="date"
                value={edit ? dateSelectedFormatted : dateSelected}
                onChange={e => setDateSelected(e.target.value)}
              />
            </div>
            <div>
              <h3>DATA DE TÉRMINO</h3>
              <Input name="endDate" type="text" readOnly value={endDate} />
            </div>
            <div>
              <h3>VALOR FINAL</h3>
              <Input
                name="final_price"
                type="text"
                readOnly
                value={totalPrice ? formatCurrencyBR(totalPrice) : ''}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
