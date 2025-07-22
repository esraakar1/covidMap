import { BrowserRouter } from "react-router-dom";
import Header from "../pages/detail/header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { render, screen } from "@testing-library/react";
import { mockData } from "../utils/constants";
// redux kullanılan bileşenler için sahte store lar oluşturmamızı sağlayacak fonksiyonun kurulumunu yap
const mockStore = configureStore([thunk]);
// eğer componentin içerisinde bir sağlayıcıya bağlı fonsksiyon/element çağrılıyorsa test ederken de sağlayıcı ile sarmalamalıyız
it("store yüklenme durumundayken ekrana loader basılır", () => {
  // bu test seneryasuna uygun bir store olustur
  const store = mockStore({ isLoading: true, error: null, data: null });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
});
it("store yüklenme bittiğinde ekranda loader yoktur", () => {
  const store = mockStore({ isLoading: false, error: null, data: null });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  // ekranda loader yok
  const loader = screen.queryByTestId("header-loader");
  expect(loader).toBeNull();
});
it("store a veri geldiğinde ekrana ülke ve bayrak basılır", () => {
  const store = mockStore({ isLoading: false, error: null, data: mockData });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  //  ülke ismi ekrana geldi mi
  screen.getByRole("heading", { name: mockData.country });
  // resim ekranda mı
  const img = screen.getByAltText(mockData.flag.alt);
  // resmin kaynağı doğru mu
  expect(img).toHaveAttribute("src", mockData.flag.png);
});