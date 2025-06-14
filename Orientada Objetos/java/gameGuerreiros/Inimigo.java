package com.mycompany.app;

public class Inimigo {
    private int hp;
    private int atq;
    private int sp_atq;
    private int def;
    private int sp_def;
    private int escudo;


    public Inimigo(int hp, int atq, int sp_atq, int def, int sp_def) {
        this.hp = hp;
        this.atq = atq;
        this.sp_atq = sp_atq;
        this.def = def;
        this.sp_def = sp_def;
        this.escudo = 0;
    }
    
    public void linha()
    {
        System.out.println("-=-=-=-=-=-=-=-=-=-=-=");
    }
    
    public boolean taVivo(Heroi heroi) 
    {
        if (this.getHp() <= 0) {
            heroi.setMoeda(heroi.getMoeda() + 10);
            return false;
        }
        return true;
    }
    
    public void defender() 
    {
        linha();
        this.setEscudo(this.getEscudo() + 10);
        System.out.println("O Inimigo se defendeu e ganhou +10 de escudo!");
    }
    
    public void atacar(Heroi heroi)
    {
        linha();
        System.out.format("Ataque bem sucedido contra o herói! %d de dano!\n", this.getAtq());
        heroi.setHp(heroi.getHp() - this.atq);
    }
    
    
    public void statusInit() 
    {
        System.out.format("Inimigo:\nVida: %d\nAtaque: %d\nAtaque especial: %d\nDefesa: %d\nDefesa especial: %d\n",
                this.getHp(), this.getAtq(), this.getSp_atq(), this.getDef(), this.getSp_def());
        linha();
    }
    
    public void status()
    {
        System.out.format("Inimigo:\nVida: %d\nEscudo: %d\n", this.getHp(), this.getEscudo());
        linha();
    }


    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getAtq() {
        return atq;
    }

    public void setAtq(int atq) {
        this.atq = atq;
    }

    public int getSp_atq() {
        return sp_atq;
    }

    public void setSp_atq(int sp_atq) {
        this.sp_atq = sp_atq;
    }

    public int getDef() {
        return def;
    }

    public void setDef(int def) {
        this.def = def;
    }

    public int getSp_def() {
        return sp_def;
    }

    public void setSp_def(int sp_def) {
        this.sp_def = sp_def;
    }

    public int getEscudo() {
        return escudo;
    }

    public void setEscudo(int escudo) {
        this.escudo = escudo;
    }
    
}
