import { fireEvent, render, screen } from "@testing-library/react";
import Error from "../components/error/error";
it("prop olarak alınan hata mesajı ekrana basılır", () => {
  render(<Error info="İnternetiniz çok yavaş" refetch={() => {}} />);
  screen.getByText(/yavaş/i);
});
it("refetch fonksiyonu buton tıklandığında çağrılır", () => {
  // jest ile sahte bir fonksiyon oluştur
  const mockfn = jest.fn();
  // bileşeni renderla
  render(<Error info="internetiniz çok yavaş" refetch={mockfn} />);
  // butonu al
  const button = screen.getByRole("button");
  // tekrar dene butonuna tıkla
  fireEvent.click(button);
  // refetch fonksiyonu çağrıldı mı
  expect(mockfn).toHaveBeenCalledTimes(1);
});