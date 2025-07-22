import { render, screen } from "@testing-library/react";
import Content from "../pages/detail/content";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockData } from "../utils/constants";

const mockStore = configureStore();

test("store yüklenme durumundayken ekrana loader gelir", () => {
    mockStore({isLoading: true, error: null, data: null})
    render( 
    <Provider>
    <Content />
    </Provider>
    );

    screen.getAllByTestId("content-loader");
});

test("store hata durumundayken ekrana error gelir", () => {
    const store = mockStore({ isLoading: false, error: "internetiniz çok yavaş", data: null});

    render (
        <Provider store={store}>
            <Content />
        </Provider>
    );
   screen.getByTestId("error");
});


test("store a veri geldiğinde nesnedeki her bir değer için kart basılır", () => {
    const store = mockStore({
        isLoading: false, error: null, data: mockData
    });

    render(
        <Provider store={store}>
            <Content />
        </Provider>
    );

    const arr = Object.entries(mockData).filter(([key]) => key !== "flag");

    arr.forEach((item) => {
        screen.getByText(item[0]);

        screen.getByText(item[1]);
    });
});