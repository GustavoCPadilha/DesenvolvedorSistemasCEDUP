package com.mycompany.app;

import java.util.Scanner;


public class Heroi {
    private char classe;
    private int hp;
    private int atq;
    private int sp_atq;
    private int def;
    private int sp_def;
    private int exp;
    private int nivel;
    private int moeda;
    private int pocao;
    //fazer armas e armaduras, magias, classe, mana
    

    public Heroi(char classe, int hp, int atq, int sp_atq, int def, int sp_def, int exp, int nivel, int moeda, int pocao) {
        this.classe = classe;
        if (this.getClasse() == 'g')
        {
            this.hp = 80;
            this.atq = 5;
            this.sp_atq = 30;
            this.def = 5;
            this.sp_def = 10;
        }
        else if (this.getClasse() == 'm')
        {
            this.hp = 100;
            this.atq = 20;
            this.def = 10;
            this.sp_atq = 0;
            this.sp_def = 5;
        }
        this.exp = 0;
        this.nivel = 0;
        this.moeda = 0;
        this.pocao = 0;
    }
    
    public boolean taVivo() {
        if (this.getHp() <= 0) {
            return false;
        }
        return true;
    }

    
    public void atacar(Inimigo inimigo) {
        System.out.format("Ataque bem sucedido contra o inimigo! %d de dano!\n", this.getAtq());
        inimigo.setHp(inimigo.getHp() - this.atq);
    }
    
    public void defender() {

    }
    
    public void pocao() {
        if (this.getPocao() > 0)
        {
            this.setPocao(this.getPocao() - 1);
            this.setHp(this.getHp() + 50);
            if (this.getHp() > 100)
            {
                this.setHp(100);
            }
        }
    }
    
    public void definirClasse()
    {

    }
    
    public void status() {
        System.out.format("Herói:\nVida: %d\nAtaque: %d\nAtaque especial: %d\nDefesa: %d\nDefesa especial: %d\nExperiência: %d\nNível: %d\n",
                this.getHp(), this.getAtq(), this.getSp_atq(), this.getDef(), this.getSp_def(), this.getExp(), this.getNivel());
        System.out.println("-=-=-=-=-=-=-=-=-=-=-=");
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

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public int getNivel() {
        return nivel;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }

    public int getMoeda() {
        return moeda;
    }

    public void setMoeda(int moeda) {
        this.moeda = moeda;
    }

    public int getPocao() {
        return pocao;
    }

    public void setPocao(int pocao) {
        this.pocao = pocao;
    }

    public char getClasse() {
        return classe;
    }

    public void setClasse(char classe) {
        this.classe = classe;
    }
    
}
