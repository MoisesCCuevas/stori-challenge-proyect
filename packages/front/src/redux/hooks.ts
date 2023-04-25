import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { StateType, DispachType } from './store';

export const useDispatchT: () => DispachType = useDispatch;
export const useSelectorT: TypedUseSelectorHook<StateType> = useSelector;