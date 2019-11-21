import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, addMonths, parseISO } from 'date-fns';

import { toast } from 'react-toastify';

import AsyncSelect from 'react-select/async';

import { Form, Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { formatCurrencyBR } from '~/util/format';

import { Container, Content } from './styles';

export default function FormRegistration() {
  const { idRegistration } = useParams();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [dateSelected, setDateSelected] = useState(
    format(new Date(), 'yyy-MM-dd')
  );
  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [planSelected, setPlanSelected] = useState();
  const [studentSelected, setStudentSelected] = useState([]);

  async function loadRegistration() {
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
  }

  useEffect(() => {
    loadRegistration();

    if (idRegistration) {
      setEdit(true);
      loadRegistrationForEdit();
    }
  }, []);

  async function loadRegistrationForEdit() {
    await api.get(`registrations/${idRegistration}`).then(response => {
      setStudentSelected(response.data.student_id);
      setDateSelected(format(parseISO(response.data.start_date), 'yyyy-MM-dd'));
      setPlanSelected(response.data.plan_id);
    });
  }

  const filterStudents = (inputValue: string) => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsStudent = (inputValue, callback) => {
    callback(filterStudents(inputValue));
  };

  useEffect(() => {
    if (planSelected && plans) {
      const planIndexSelected = plans.findIndex(
        plan => plan.id === planSelected
      );

      setEndDate(
        format(
          addMonths(new Date(dateSelected), plans[planIndexSelected].duration),
          'dd/MM/yyyy'
        )
      );
      setTotalPrice(
        plans[planIndexSelected].price * plans[planIndexSelected].duration
      );
    }
  }, [planSelected, dateSelected]);

  async function handleNew() {
    if (!studentSelected || !planSelected || !dateSelected) {
      toast.warning(
        'Você precisa selecionar o aluno, o plano e a data de início'
      );
    } else {
      await api
        .post('registrations', {
          student_id: studentSelected,
          plan_id: planSelected,
          start_date: dateSelected,
        })
        .then(() => {
          toast.success('Matrícula efetivada com sucesso!');
          history.goBack();
        })
        .catch(error => {
          toast.error(error);
        });
    }
  }

  async function handleEdit() {
    if (!studentSelected || !planSelected || !dateSelected) {
      toast.warning(
        'Você precisa selecionar o aluno, o plano e a data de início'
      );
    } else {
      await api
        .put(`registrations/${idRegistration}`, {
          student_id: studentSelected,
          plan_id: planSelected,
          start_date: dateSelected,
        })
        .then(() => {
          toast.success('Matrícula atualizada com sucesso!');
          history.goBack();
        })
        .catch(error => {
          toast.error(error);
        });
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
                autoComplete="off"
                placeholder="Escolha a data"
                onChange={e => setDateSelected(e.target.value)}
                value={dateSelected}
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
