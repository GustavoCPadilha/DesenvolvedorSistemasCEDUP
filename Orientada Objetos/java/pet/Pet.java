package com.mycompany.pet;


public class Pet {
    private String nome;
    private int fome;
    private int felicidade;
    private int sono;
    private int higiene;
    private int moeda;
    private int qtdeItemSono;
    private int qtdeItemFome;
    private int qtdeItemFelicidade;
    private int qtdeItemHigiene;
    
    public Pet(String nome, int fome, int felicidade, int sono, int higiene) {
        this.nome = nome;
        this.fome = fome;
        this.felicidade = felicidade;
        this.sono = sono;
        this.higiene = higiene;
    }
    
    public boolean verificaMoeda()
    {
        boolean temMoeda;
        temMoeda = this.getMoeda() >= 30;
        return temMoeda;
    }
    
    public String morte()
    {
        String motivo = "suave";
        
        if (getFome() <= 0)
        {
            motivo = "fome";
        }
        else if (getFelicidade() <= 0)
        {
            motivo = "depressão";
        }
        else if (getSono() <= 0)
        {
            motivo = "sono literalmente";
        }
        else if (getHigiene() <= 0)
        {
            motivo = "infectado pela sujeira";
        }
        return motivo;
    }
    
    public void status()
    {
        System.out.println("---------------------");
        System.out.format("Nome: %s\n", this.getNome());
        System.out.format("Fome: %d%%\n", this.getFome());
        System.out.format("Felicidade: %d%%\n", this.getFelicidade());
        System.out.format("Sono: %d%%\n", this.getSono());
        System.out.format("Higiene: %d%%\n", this.getHigiene());
        System.out.format("Moedas: %d\n", this.getMoeda());
    }
    
    public void dormir()
    {
        int diferenca = 100 - this.getSono();
        this.setSono(this.getSono() + diferenca);
        this.setFome(this.getFome() - diferenca);
        this.setHigiene(this.getHigiene() - (diferenca / 2));
    }

    public void comer()
    {
        int diferenca = 100 - this.getFome();
        this.setFome(this.getFome() + diferenca);
        this.setFelicidade(this.getFelicidade() - diferenca);
        this.setHigiene(this.getHigiene() - (diferenca / 2));
    }

    public void brincar()
    {
        int diferenca = 100 - this.getFelicidade();
        this.setFelicidade(this.getFelicidade() + diferenca);
        this.setSono(this.getSono() - diferenca);
        this.setHigiene(this.getHigiene() - (diferenca / 2));
    }

    public void banheiro()
    {
        int diferenca = 100 - this.getHigiene();
        this.setHigiene(this.getHigiene() + diferenca);
        this.setSono(this.getSono() - diferenca);
        this.setFome(this.getFome() - (diferenca / 2));
    }
    
    public void ganharDinheiro()
    {
        this.setMoeda(this.getMoeda() + 10);
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getFome() {
        return fome;
    }

    public void setFome(int fome) {
        this.fome = fome;
    }

    public int getFelicidade() {
        return felicidade;
    }

    public void setFelicidade(int felicidade) {
        this.felicidade = felicidade;
    }

    public int getSono() {
        return sono;
    }

    public void setSono(int sono) {
        this.sono = sono;
    }

    public int getHigiene() {
        return higiene;
    }

    public void setHigiene(int higiene) {
        this.higiene = higiene;
    }   

    public int getMoeda() {
        return moeda;
    }

    public void setMoeda(int moeda) {
        this.moeda = moeda;
    }

    public int getQtdeItemSono() {
        return qtdeItemSono;
    }

    public void setQtdeItemSono(int qtdeItemSono) {
        this.qtdeItemSono = qtdeItemSono;
    }

    public int getQtdeItemFome() {
        return qtdeItemFome;
    }

    public void setQtdeItemFome(int qtdeItemFome) {
        this.qtdeItemFome = qtdeItemFome;
    }

    public int getQtdeItemFelicidade() {
        return qtdeItemFelicidade;
    }

    public void setQtdeItemFelicidade(int qtdeItemFelicidade) {
        this.qtdeItemFelicidade = qtdeItemFelicidade;
    }

    public int getQtdeItemHigiene() {
        return qtdeItemHigiene;
    }

    public void setQtdeItemHigiene(int qtdeItemHigiene) {
        this.qtdeItemHigiene = qtdeItemHigiene;
    }
}
