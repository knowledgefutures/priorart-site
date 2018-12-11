# Prior Art Archive Site


## To Install

```
npm install
```

## To Run Dev Mode

```
npm start
```
Navigate to `localhost:8765`

## Storybook

To build and test components, we use Storybook. To run:

```
npm run storybook
```

Navigate to `localhost:9001`	

## To Build and Run Production Version

```
npm run prod
```

Navigate to `localhost:8765`


# Code Practices

## Containers vs Components

The client side code follows a [Container/Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) split as is common in React-based sites. The structure and difference between the two in this repo is not exactly as described in the preceeding article. For this repo, the following describes how containers and components are differentiated:

### Containers
- Associated with a specific URL route
- One a single container is used on a given URL route
- Calls hydrateWrapper() to initialize React bindings after using server-side renered HTML for immediate display.
- Holds the ground truth data for a given view. Often the ground truth data is passed into containers as props through hydrateWrapper(), but in cases where the ground truth data is being changed, the container will hold ground truth data in it's state.

### Components
- All other non-container components :)
- Many components are used within a given URL route
- Can store it's own state if needed for UX functionality - but should always update the ground truth data held in its parent container.
- Can make it's own API requests when the functionality and layout of the pertaining request is contained within the single component. Though if this request influences the ground truth data, the component should be passed an updating function that allows it to update the ground truth data held in the container.

## Commits

Preferred practice is to prefix commits with one of the following categories:
- `fix`: for commits focused on specific bug fixes
- `feature`: for commits that introduce a new feature
- `update`: for commits that improve an existing feature
- `dev`: for commits that focus solely on documentation, refactoring code, or developer experience updates
