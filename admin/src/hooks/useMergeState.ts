import { useCallback, useState } from 'react'

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null,
) => void

const useMergeState = <S extends Record<string, any>>(initialState: S): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState)

  const setMergeState = useCallback(newState => {
    setState(prevState => {
      return newState ? { ...prevState, ...newState } : prevState
    })
  }, [])

  return [state, setMergeState]
}

export { useMergeState }
