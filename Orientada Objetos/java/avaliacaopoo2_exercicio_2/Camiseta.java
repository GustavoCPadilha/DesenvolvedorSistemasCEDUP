package com.mycompany.avaliacaopoo2_exercicio_2;


public class Camiseta extends ItemGuardaRoupa{
    private boolean golaV, estampa, mangaLonga;

    public Camiseta(boolean golaV, boolean estampa, boolean mangaLonga, String marca, String cor, String tamanho, String material) {
        super(marca, cor, tamanho, material);
        this.golaV = golaV;
        this.estampa = estampa;
        this.mangaLonga = mangaLonga;
    }

    public boolean isGolaV() {
        return golaV;
    }

    public void setGolaV(boolean golaV) {
        this.golaV = golaV;
    }

    public boolean isEstampa() {
        return estampa;
    }

    public void setEstampa(boolean estampa) {
        this.estampa = estampa;
    }

    public boolean isMangaLonga() {
        return mangaLonga;
    }

    public void setMangaLonga(boolean mangaLonga) {
        this.mangaLonga = mangaLonga;
    }


}
