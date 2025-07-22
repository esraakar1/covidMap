import { totalApi } from "../utils/api"
import Statistic from "../pages/home/statistic";
import { totalData } from "../utils/constants";
import millify from "millify";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../utils/api", () => ({
    totalApi: { get: jest.fn() },
}));

describe("istatistik component testleri", () => {
    //  her testten tan önce bütün mockları temizle
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("bileşen renderlandığında ekrana loader gelir", () => {
        // loader testini yapacağımız için sahte get fonksiyonun promise döndürmesini istedik
        totalApi.get.mockReturnValue(new Promise(() => {}));

        // bileşeni renderla
        render(<Statistic />);

        // ekranda loader componentı vardır
        screen.getByTestId("loader");
    });


    test("api dan hata geldiğinde ekranda hata mesajı yazar", async () => {
        totalApi.get.mockRejectedValue(new Error("404 hatası"));

        // bileşeni renderla
        render(<Statistic />);

        // belirli bir sürenin ardından ekrana hata basılır
        await waitFor(() => screen.getByText("Üzgünüz bir sorun oluştu"));
    });

    test("api dan cevap geldiğinde ekrana veriler basılır", async () => {
        totalApi.get.mockResolvedValue({data: {data: totalData}});

        render(<Statistic />);

        await waitFor(() => expect(totalApi.get).toHaveBeenCalled());

        screen.getByText(millify(totalData.confirmed));

        screen.getByText(millify(totalData.active));

        screen.getByText(millify(totalData.deaths));
    });
});