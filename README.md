# Todo App built with React

I decided to build another Todo App and try out two things:

- Context and Reducer pattern: Two contexts, one for the state and one for dispatch.
- View Transitions API: To animate the items when they are added or removed.

# Demo

https://github.com/tigerabrodi/luffy/assets/49603590/4038c33e-88d4-4923-93ae-3a80afe5322d

# Get it up and running

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev`

# Context and Reducer pattern

## Problem with a single context

Whenever you update state in a context, all components that consume the context are re-rendered. Even if the state they consume isn't the one that changed.

This isn't always a problem, but it's not efficient. If a component is simply triggering an update to happen, it doesn't need to re-render. Therefore, it shouldn't.

To be clear: A component that consume a `setState` function shouldn't re-render when the state changes. It's only causing the update to happen but doesn't need to know about the state.

## Solution: Two contexts

The solution to this is to use two contexts and a reducer. One for the state and one for the dispatch.

Components that dispatch actions will not re-render when state changes.

Mind you, this isn't always needed and of course an overkill for a todo app, but I wanted to try it out and see how it re-renders behave.

<details>
  <summary>🍿 Todo Context Code</summary>

```tsx
import type { Action } from '../reducers/todo'
import type { Todo } from '../schemas/todos'
import type { ReactNode, Dispatch } from 'react'

import { createContext, useReducer } from 'react'

import { todoReducer } from '../reducers/todo'

export type State = {
  todos: Array<Todo>
}

const initialState: State = {
  todos: [],
}

export const TodoStateContext = createContext<State | undefined>(undefined)
export const TodoDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

type StateProviderProps = {
  children: ReactNode
}

const TodoProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export { TodoProvider }
```

</details>

# View Transitions API

The View Transitions API is a new API that allows you to animate the UI between two different states.

It's supported in Chrome, under feature flag in Safari and not yet in Firefox.

<details>
  <summary>🍿 View Transitions API Explained</summary>

---

## What is it?

A view transition in its essence is a way to animate the UI between two different states.

## Anatomy of a View Transition

During a view transition, the browser constructs a pseudo-element tree that represents the old and new views.

```
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

- `::view-transition` is the main element that represents the view transition.
- `::view-transition-group(root)` represents a single view transition group. In a to-do list app, ::view-transition-group(root) would represent the transition for the entire to-do list container.
- `::view-transition-image-pair(root)` This is a container for the view transition's "old" and "new" view states, before and after the transition. In a to-do list app, ::view-transition-image-pair(root) would contain the old and new states of the to-do list container during the transition.
- `::view-transition-old(root)` is the old view transition element. In a to-do list app, ::view-transition-old(root) would represent the snapshot of the to-do list before an item is added, removed, or updated.
- `::view-transition-new(root)` is the new view transition element. In a to-do list app, ::view-transition-new(root) would represent the snapshot of the to-do list after an item is added, removed, or updated.

## Transition Name

All the elements involved in a transition must have a unique `view-transition-name` style property. This tells the browser to capture the element's visual state for the transition.

In a todo app, this doesn't just mean the item that gets removed, but also all the other items. Because if an item gets removed, the other items will shift their positioning.

That's one of the confusions I had. I wanted to explicit about it.

If the name isn't unique, the transition won't work.

It's kind of like React's key prop.

How I implemented it in `src/components/Item.tsx`:

```tsx
<li
  className="flex items-center gap-3 px-4 py-3 border border-gray-800 rounded-md"
  style={{
    viewTransitionName: `item-${item.id}`,
  }}
>
  // ...
</li>
```

## Transition Class

Transition class is different. It's a shared class to the elements involved in a transition. Both class and name are required for the view transition to work.

How I implemented it in `src/components/Item.css`:

```css
li {
  view-transition-class: item;
}
```

## Starting a transition

The stuff I've showed you so far is all you need to start a view transition. By default, it's a simple transition with a fade-in and fade-out effect.

To start the transition, you do the state updates inside `document.startViewTransition`.

```jsx
document.startViewTransition(() => {
  flushSync(() => {
    dispatch({ type: 'ADD_TODO', payload: { title: todoValue } })
  })
})
```

What's the deal with `flushSync` you may wonder?

Well, React batches state updates together asynchronously. So if you do a state update inside a view transition, it won't be reflected immediately.

To make sure the state update is reflected immediately, you need to wrap it in `flushSync`.

I've written about it here: [Understanding flushSync](https://tigerabrodi.blog/understanding-flushsync-mastering-batching-behavior-in-reactjs).

## More stuff

If you look at my CSS, you'll see some more things:

```css
@keyframes slide-out {
  to {
    translate: 100% 0;
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    translate: 100% 0;
    opacity: 0;
  }
}

::view-transition-group(.item) {
  animation-duration: 400ms;
}

/* Item gets added */
::view-transition-new(.item):only-child {
  animation-name: slide-in;
}

/* Item gets removed */
::view-transition-old(.item):only-child {
  animation-name: slide-out;
}
```

We got two animations: `slide-in` and `slide-out`.

The `::view-transition-group(.item)` is the wrapper around the image pair which contains the old and new views. The child views will inherit the animation duration from the parent.

Here comes the very interesting part:

```css
/* Item gets added */
::view-transition-new(.item):only-child {
  animation-name: slide-in;
}

/* Item gets removed */
::view-transition-old(.item):only-child {
  animation-name: slide-out;
}
```

When a view transition happens, we have the snapshot of the old and new view. Each view contains the children elements. In our case, we target the transition class `.item` which is applied to each `li` element.

Both the old and new view will have the entire view of the list.

However, if an item gets added, it means the old view does NOT have the item that was added. While the new view does.

If an item is deleted, the old view has the item that was deleted. The new view doesn't have it.

When we use `:only-child`, we're saying in a human language e.g. if an item is added: "If the element with transition class `.item` only exists in the new view but not the old one, use the `slide-in` animation."

So, we're telling the browser to animate the item that didn't exist but now does.

It's the same way the other way around.

It's a bit tricky to understand. But the key here is to understand that there is a difference in the old and new view.

We want to target the `li` element that was added or removed. If removed, it doesn't exist in the new view during the view transition.

## Future

I'm excited about this API.

It's fun because it's not tried to specific animations. The way it's constructed is super cool. It unlocks many doors.

You have a transition happening between two states. The old and new state. And you decide what should animate during this transition.

I'm stoked for its future.

</details>

# Zod and TypeScript baby

If you know me, you know I love type safe code.

So yeah, using em too, cheers.
