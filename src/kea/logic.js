import { kea } from "kea";
import axios from 'axios';

const API_URL = 'https://secure-dusk-08285.herokuapp.com/' || 'http://localhost:8080'

const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const logic = kea({
  actions: () => ({
    addExpenseRequest: expense => ({ expense }),
    addExpenseSuccess: expense => ({ expense }),
    updateExpenseRequest: expense => ({ expense }),
    updateExpenseSuccess: expense => ({ expense }),
    removeExpenseRequest: deletedId => ({ deletedId }),
    removeExpenseSuccess: deletedId => ({ deletedId }),
    getExpenses: true,
    setExpenses: (expenses) => ({ expenses }),
    getNames: true,
    setNames: (names) => ({ names }),
    setFetchError: (error) => ({ error })
  }),
  reducers: () => ({
    all_expenses: [
      [],
      {
        addExpenseSuccess: (state, { expense }) => [...state, expense],
        updateExpenseSuccess: (state, { expense }) => {
          let newState = [...state]
          const index = newState.findIndex(({ _id }) => _id === expense._id);
          newState[index] = expense;
          return newState
        },
        removeExpenseSuccess: (state, { deletedId }) => {
          console.log(state, deletedId);
          return state.filter((item) => item._id !== deletedId);
        },
        removeExpense: () => { },
        getExpenses: () => [],
        setExpenses: (_, { expenses }) => expenses,
      }
    ],
    names: [
      [],
      {
        getNames: () => [],
        setNames: (_, { names }) => names,
      }
    ],
    isLoading: [false, {
      getExpenses: () => true,
      getNames: () => true,
      setExpenses: () => false,
      setNames: () => false,
      addExpenseRequest: () => true,
      addExpenseSuccess: () => false,
      updateExpenseRequest: () => true,
      updateExpenseSuccess: () => false,
      removeExpenseRequest: () => true,
      setFetchError: () => false
    }],
    error: [null, {
      getExpenses: () => null,
      getNames: () => null,
      addExpenseRequest: () => null,
      updateExpenseRequest: () => null,
      removeExpenseRequest: () => null,
      setFetchError: (_, { error }) => error
    }]
  }),
  listeners: ({ actions }) => ({
    getExpenses: async ({ }, breakpoint) => {
      const url = `/expenses`
      let response

      try {
        response = await fetcher.get(url)
      } catch (error) {
        actions.setFetchError(error.message)
        return
      }
      // break if action was dispatched again while we were fetching
      breakpoint()

      const json = await response.data

      if (response.status === 200) {
        actions.setExpenses(json)
      } else {
        actions.setFetchError(json.message)
      }
    },
    getNames: async ({ }, breakpoint) => {
      const url = `/names`
      let response

      try {
        response = await fetcher.get(url)
      } catch (error) {
        actions.setFetchError(error.message)
        return
      }
      // break if action was dispatched again while we were fetching
      breakpoint()
      const json = await response.data

      if (response.status === 200) {
        actions.setNames(json)
      } else {
        actions.setFetchError(json.message)
      }
    },
    addExpenseRequest: async ({ expense }, breakpoint) => {
      const url = `/expense`
      let response

      try {
        response = await fetcher.post(url, { expense })
      } catch (error) {
        actions.setFetchError(error.message)
        return
      }
      // break if action was dispatched again while we were fetching
      breakpoint()
      const json = await response.data

      if (response.status === 200) {
        actions.addExpenseSuccess(json)
        console.log(response)
      } else {
        actions.setFetchError(json.message)
      }
    },

    updateExpenseRequest: async ({ expense }, breakpoint) => {

      const url = `/expense/${expense._id}`
      let response

      try {
        response = await fetcher.put(url, { expense })
      } catch (error) {
        actions.setFetchError(error.message)
        return
      }
      // break if action was dispatched again while we were fetching
      breakpoint()
      const json = await response.data

      if (response.status === 200) {
        actions.updateExpenseSuccess(json)
        console.log(response)
      } else {
        actions.setFetchError(json.message)
      }
    },

    removeExpenseRequest: async ({ deletedId }, breakpoint) => {
      const url = `/expense/${deletedId}`
      let response

      try {
        response = await fetcher.delete(url)
      } catch (error) {
        console.log(error)
        return
      }
      // break if action was dispatched again while we were fetching
      breakpoint()
      const json = await response.data

      if (response.status === 204) {
        actions.removeExpenseSuccess(deletedId)
        console.log(response)
      } else {
        actions.setFetchError(json.message)
      }
    }
  }),
  events: ({ actions, values }) => ({
    afterMount: () => {
      actions.getExpenses()
      actions.getNames()
    }
  })
});
