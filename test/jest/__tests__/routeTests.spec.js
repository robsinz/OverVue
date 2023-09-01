/* eslint-disable */
/**
 * @jest-environment jsdom
 */
// import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
// import { mount, shallowMount } from "@vue/test-utils";
import { createApp } from "vue";
import * as All from "quasar";
const { Quasar, date } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

// import actions from "../../../src/store/options/actions";
// import mutations from "../../../src/store/options/mutations";
// import * as types from "../../../src/store/options/types";
// import Vuex from "vuex";
// import store from "../../../src/store/state/index";
import { setActivePinia, createPinia } from 'pinia'
import * as types from "../../../types";
import { useStore } from "src/store/main.js";


/**
 * @description: Testing functionality of route actions and mutations
 * `actions:` `addRouteToRouteMap', `setActiveRoute`, `setRoutes`, `deleteRoute`
 * `mutations: ADD_ROUTE, SET_ACTIVE_ROUTE, SET_ROUTES, SET_ACTIVE_ROUTE_ARRAY, ADD_ROUTE_TO_COMPONENT_MAP, DELETE_ROUTE
 * `state:` routes, activeRoute, componentMap, imagePath
 */

describe("Test Suite for route actions and related mutations", () => {
  // const localVue = createLocalVue();
  // localVue.use(Quasar, Vuex, { components });
  const App = {};
  const app = createApp(App);
  const pinia = setActivePinia(createPinia());
  app.use(Quasar, pinia, { components });
  const store = useStore();
  // const state = { ...store };

  // test('"[types.addRouteToRouteMap]" action to commit 4 mutations', () => {
  //   const commit = jest.fn();
  //   const payload = "testRoute";
  //   actions[types.addRouteToRouteMap]({ state, commit }, payload);
  //   expect(commit).toHaveBeenCalledWith(types.ADD_ROUTE, payload);
  //   expect(commit).toHaveBeenCalledWith(types.SET_ACTIVE_ROUTE, payload);
  //   expect(commit).toHaveBeenCalledWith(types.ADD_ROUTE_TO_COMPONENT_MAP, {
  //     route: state.activeRoute,
  //     children: [],
  //   });
  //   expect(commit).toHaveBeenCalledWith(
  //     types.ADD_COMPONENT_TO_COMPONENT_CHILDREN,
  //     {
  //       component: "App",
  //       value: state.componentMap[state.activeRoute].componentName,
  //     }
  //   );
  // });

  // test('"[types.setActiveRoute]" action to commit SET_ACTIVE_ROUTE mutation with string payload', () => {
  //   const commit = jest.fn();
  //   const payload = "HomeView";
  //   actions[types.setActiveRoute]({ state, commit }, payload);
  //   expect(commit).toHaveBeenCalledWith(types.SET_ACTIVE_ROUTE, payload);
  // });

  // test('"[types.deleteRoute]" action to commit DELETE_ROUTE mutation with string payload', () => {
  //   const commit = jest.fn();
  //   const payload = "HomeView";
  //   actions[types.deleteRoute]({ state, commit }, payload);
  //   expect(commit).toHaveBeenCalledWith(types.DELETE_ROUTE, payload);
  // });

  test('addRoute function to add new route and set route imagePath to default', () => {
    const payload = "testRoute";
    store.addRoute(payload);
    expect(store.routes).toMatchObject({ HomeView: [], [payload]: [] });
  });

  // test('"[types.ADD_ROUTE]" mutation to add new route and set route imagePath to default', () => {
  //   const payload = "testRoute";
  //   mutations[types.ADD_ROUTE](state, payload);
  //   expect(state.routes).toMatchObject({ HomeView: [], [payload]: [] });
  // });

  test('setActiveRoute funtion to ---', () => {
    const payload = "testRoute";

    // expect at test start for there to be two routes and HomeView to be active Route
    expect(store.routes).toMatchObject({ HomeView: [], [payload]: [] });
    expect(store.activeRoute).toBe("HomeView");

    // start test
    store.setActiveRoute(payload);
    expect(store.activeRoute).toBe(payload);
  });


  // test('"[types.SET_ACTIVE_ROUTE]" mutation to ---', () => {
  //   const payload = "testRoute";

  //   // expect at test start for there to be two routes and HomeView to be active Route
  //   expect(state.routes).toMatchObject({ HomeView: [], [payload]: [] });
  //   expect(state.activeRoute).toBe("HomeView");

  //   // start test
  //   mutations[types.SET_ACTIVE_ROUTE](state, payload);
  //   expect(state.activeRoute).toBe(payload);
  // });

  test('addRouteToComponentMap function to add route object containing 3 keys to store.componentMap', () => {
    expect(Object.keys(store.componentMap).length).toBe(2);
    store.addRouteToComponentMap({
      route: store.activeRoute,
      children: [],
    });
    expect(Object.keys(store.componentMap).length).toBe(3);
    // to contain componentName, children, and htmlList keys
    expect(Object.keys(store.componentMap[store.activeRoute])).toMatchObject([
      "componentName",
      "children",
      "htmlList",
    ]);
  });

  // test('"[types.ADD_ROUTE_TO_COMPONENT_MAP]" mutation to add route object containing 3 keys to state.componentMap', () => {
  //   expect(Object.keys(state.componentMap).length).toBe(2);
  //   mutations[types.ADD_ROUTE_TO_COMPONENT_MAP](state, {
  //     route: state.activeRoute,
  //     children: [],
  //   });
  //   expect(Object.keys(state.componentMap).length).toBe(3);
  //   // to contain componentName, children, and htmlList keys
  //   expect(Object.keys(state.componentMap[state.activeRoute])).toMatchObject([
  //     "componentName",
  //     "children",
  //     "htmlList",
  //   ]);
  // });

  // test('"[types.ADD_COMPONENT_TO_COMPONENT_CHILDREN]" mutation to add created route as one of Apps children', () => {
  //   let component = "App";
  //   let value = state.componentMap[state.activeRoute].componentName;
  //   expect(state.componentMap[component].children.length).toBe(1);
  //   mutations[types.ADD_COMPONENT_TO_COMPONENT_CHILDREN](state, {
  //     component,
  //     value,
  //   });
  //   expect(state.componentMap[component].children.length).toBe(2);
  //   expect(
  //     state.componentMap[component].children[
  //       state.componentMap[component].children.length - 1
  //     ]
  //   ).toBe(value);
  // });

  test('"function deleteRoute to update state by removing a route', () => {
    // Type: deleteRoute: (payload: string) => void;
    const payload = "testRoute";
    let flag = false;
    // pre mutation tests
    expect(store.routes[payload]).not.toBe(undefined);
    expect(store.componentMap[payload]).not.toBe(undefined);
    expect(store.imagePath[payload]).not.toBe(undefined);

    // expect(store.activeRoute).toEqual(payload);

    if (store.activeRoute === payload) {
      flag = true; 
    }
    store.deleteRoute(payload);
    // post mutation tests
    expect(store.routes[payload]).toBe(undefined);
    expect(store.componentMap[payload]).toBe(undefined);
    expect(store.imagePath[payload]).toBe(undefined);
    if (flag) {
      expect(store.activeRoute).not.toBe(payload);
    }
  });

  // test('"[types.DELETE_ROUTE]" mutation to update state by removing a route', () => {
  //   const payload = "testRoute";
  //   let flag = false;
  //   // pre mutation tests
  //   expect(state.routes[payload]).not.toBe(undefined);
  //   expect(state.componentMap[payload]).not.toBe(undefined);
  //   expect(state.imagePath[payload]).not.toBe(undefined);
  //   if (state.activeRoute === payload) {
  //     flag = true;
  //   }
  //   mutations[types.DELETE_ROUTE](state, payload);

  //   // post mutation tests
  //   expect(state.routes[payload]).toBe(undefined);
  //   expect(state.componentMap[payload]).toBe(undefined);
  //   expect(state.imagePath[payload]).toBe(undefined);
  //   if (flag) {
  //     expect(state.activeRoute).not.toBe(payload);
  //   }
  // });

  test('setActiveRouteArray function to set store.routes[store.activeRoute] to newActiveRouteArray', () => {
    // invoked by delete active component action
    const newActiveRouteArray = store.routes[store.activeRoute];
    store.setActiveRouteArray(newActiveRouteArray);
    expect(store.routes[store.activeRoute]).toBe(newActiveRouteArray);
  });

  // test('"[types.SET_ACTIVE_ROUTE_ARRAY]" mutation to set state.routes[state.activeRoute] to newActiveRouteArray', () => {
  //   // invoked by delete active component action
  //   const newActiveRouteArray = state.routes[state.activeRoute];
  //   mutations[types.SET_ACTIVE_ROUTE_ARRAY](state, newActiveRouteArray);
  //   expect(state.routes[state.activeRoute]).toBe(newActiveRouteArray);
  // });
});
