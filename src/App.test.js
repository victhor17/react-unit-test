/* eslint-disable testing-library/no-node-access */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Counter, useCounter, suma } from './App';
import { renderHook } from '@testing-library/react-hooks';
import {reducer, incrementedCounter } from './store';

let container;

beforeEach(() => {
  // beforeAll nos ayuda a generar un ambiente necesario para todas las pruebas que haremos,
  // beforeEach nos ayuda a generar un ambiente por cada prueba que haremos
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // afterAll nos ayuda a quitar el ambiente generado después de pasar todas las pruebas
  // afterEach nos ayuda a quitar el ambiente que generamos después de ejecutar cada prueba
  document.body.removeChild(container);
  container = null;
});

test('should sum a + b params', () => {
  expect(suma(1, 1)).toBe(2);
});

// usando 'react-dom/test-utils';
it('can render and update a counter', () => {
  // it es un similar a test ;)
  // Test first render
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    // act nos ayuda a manipular el dom, agregar componentes al dom, generar eventos, incluso agregar estilos.
    ReactDOM.render(<Counter />, container); // renderizamos nuestro componente dentro del container
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times'); //primera aserción

  //Test second render
  act(() => {
    // generamos un evento Click en el botón
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  //segunda aserción
  expect(label.textContent).toBe('You clicked 1 times');
});

//misma prueba anterior con React Test Library
test('Can render and update a counter', () => {
  render(<Counter />);

  const text = screen.getByText(/You clicked 0 times/i); //tratamos de buscar el texto en el documento
  //en caso que no se cuentre, el test mostrará un error
  expect(text).toBeInTheDocument();
  fireEvent.click(screen.getByText(/click me/i)); //de esta otra forma podemos generar un evento click en el botón

  const oneTime = screen.getByText(/You clicked 1 times/i);

  expect(oneTime).toBeInTheDocument();
});

// para los hooks es recomendable incluir en la descripción lo que retorna, en este caso retornamos count e increment, 
// y también indicar qué representa, count es un número e increment es una función que incrementa count en 1
test('Testing a hook, the result must be a count number and an increment function that increments count to 1 with every call', () => {

  //renderHook nos permite llamar a nuestro hook aunque no esté dentro de un componente de React
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe('function')

  act(() => { //para los hooks también usamos ´act´ para manipular el resultado de la llamada al hook
    result.current.increment()
  })

  expect(result.current.count).toBe(1) // toBe se usa para comparaciones de datos simples (que no sean obj o arrays)
});

test('testing a redux store (actions of reducers) should increment counter', () => {
  const prevState = { counter: 0};
  expect(reducer(prevState, incrementedCounter(1))).toEqual({counter: 1}) // toEqual funciona bien con datos simples, pero es preferible usarlo para objs y arrays
})
