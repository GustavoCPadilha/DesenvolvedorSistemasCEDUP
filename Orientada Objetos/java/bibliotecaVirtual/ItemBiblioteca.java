package com.mycompany.bibliotecavirtual;


public class ItemBiblioteca {
    protected String titulo, autor;
    protected boolean disponivel;

    public ItemBiblioteca(String titulo, String autor, boolean disponivel) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
    }
    
    public void emprestar()
    {
        if (this.isDisponivel())
        {
            System.out.println(this.getTitulo() + " emprestado com sucesso!");
            this.setDisponivel(false);
        }
        else
        {
            System.out.println(this.getTitulo() + " não está disponível!");
        }
    }
    
    public void devolver()
    {
        if (!this.isDisponivel())
        {
            System.out.println(this.getTitulo() + " devolvido com sucesso!");
            this.setDisponivel(true);
        }
        else
        {
            System.out.println(this.getTitulo() + " já está disponível!");
        }
    }
    
    @Override
    public String toString()
    {
        return this.getTitulo() + " | " + this.getAutor() + " - " + (this.isDisponivel() ? " Disponível" : " Emprestado");
    }
    
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}
