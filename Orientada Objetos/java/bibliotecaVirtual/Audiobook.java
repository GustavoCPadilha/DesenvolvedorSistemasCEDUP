package com.mycompany.bibliotecavirtual;


public class Audiobook extends ItemBiblioteca {
    
    private float duracaoMinutos;
    
    public Audiobook(String titulo, String autor, boolean disponivel, float duracaoMinutos) {
        super(titulo, autor, disponivel);
        this.duracaoMinutos = duracaoMinutos;
    }
    
    @Override
    public String toString()
    {
        return "Audiobook: " + super.toString() + " Duração em minutos: " + this.getDuracaoMinutos();
    }

    public float getDuracaoMinutos() {
        return duracaoMinutos;
    }

    public void setDuracaoMinutos(float duracaoMinutos) {
        this.duracaoMinutos = duracaoMinutos;
    }
    
}
