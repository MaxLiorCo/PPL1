export type State<S, A> = (initialState: S) => [S, A];


export const bind:<S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => State<S, B> = (state, f)=>{
        return (s) => {
            const state1 = state(s) //=> [new_state, A]
            const next_monad = f(state1[1]) //=> State<S,B>
            const state2 = next_monad(state1[0]) //=> [S,B]
            return state2
        }
    }
