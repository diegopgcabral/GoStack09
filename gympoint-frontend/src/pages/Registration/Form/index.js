import React, { useState, useEffect, useMemo } from 'react';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useParams } from 'react-router-dom';

import AsyncSelect from 'react-select/async';
// import Select from 'react-select';

import { Form, Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

// import api from '~/services/api';
// import { formatCurrencyBR } from '~/util/format';

import { Container, Content } from './styles';

export default function FormRegistration() {
  const { idRegistration } = useParams();

  return (
    <Container>
      <header>
        <h1>Cadastro de matrícula</h1>
        <aside>
          <button className="return" type="button">
            <MdKeyboardArrowLeft color="#FFF" size={24} />
            VOLTAR
          </button>
          <button type="submit" form="form-plan">
            <MdCheck color="#FFF" size={24} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form id="form-plan">
          <div>
            <h3>ALUNO</h3>
            <Input cacheOptions name="student_id" placeholder="Buscar aluno" />
          </div>
          <div className="last-row">
            <div>
              <h3>PLANO</h3>
            </div>
            <div>
              <h3>DATA DE INÍCIO</h3>
              <Input
                name="dateStart"
                type="date"
                autoComplete="off"
                placeholder="Escolha a data"
                onChange={e => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            <div>
              <h3>DATA DE TÉRMINO</h3>
              <Input
                readOnly
                disabled
                name="endData"
                type="text"
                value={endDateFormatted}
              />
            </div>
            <div>
              <h3>VALOR FINAL</h3>
              <Input
                readOnly
                disabled
                name="totalPrice"
                type="text"
                value={priceFormatted}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
