package com.mycompany.bibliotecavirtual;


public class Livro extends ItemBiblioteca {
    
    private int numPaginas;

    public Livro(int numPaginas, String titulo, String autor, boolean disponivel) {
        super(titulo, autor, disponivel);
        this.numPaginas = numPaginas;
    }
    
    @Override
    public String toString()
    {
        return "Livro: " + super.toString() + " Páginas: " + this.getNumPaginas();
    }

    public int getNumPaginas() {
        return numPaginas;
    }

    public void setNumPaginas(int numPaginas) {
        this.numPaginas = numPaginas;
    }
    
}
