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
    private int escudo;
    //fazer armas e armaduras, magias, mana, mais classes
    

    public Heroi() {
        this.definirClasse();
        if (this.getClasse() == 'm')
        {
            this.hp = 80;
            this.atq = 5;
            this.sp_atq = 30;
            this.def = 5;
            this.sp_def = 10;
        }
        else if (this.getClasse() == 'g')
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
        this.escudo = 0;
    }
    
    public void linha() 
    {
        System.out.println("-=-=-=-=-=-=-=-=-=");
    }
    
    public boolean taVivo() 
    {
        if (this.getHp() <= 0) {
            return false;
        }
        return true;
    }

    
    public void atacar(Inimigo inimigo) 
    {
        linha();
        if (getClasse() == 'm')
        {
            int ataque = this.getSp_atq() - inimigo.getEscudo() - inimigo.getSp_def();
            if (inimigo.getEscudo() - this.getSp_atq() < 0)
            {
                inimigo.setEscudo(0);
            }
            else
            {
                inimigo.setEscudo(inimigo.getEscudo() - this.getSp_atq());
            }
            if (ataque < 0)
            {
                ataque = 0;
            }
            System.out.println("Ataque bem sucedido contra o inimigo!");
            System.out.format("O inimigo se defendeu com seus %d pontos de defesa e %d pontos de escudo, o ataque infligiu %d de dano!\n",
                inimigo.getDef(), inimigo.getEscudo(), ataque);
            inimigo.setHp(inimigo.getHp() - ataque);  
        }
        else if (getClasse() == 'g')
        {
            int ataque = this.getAtq() - inimigo.getEscudo() - inimigo.getDef();
            if (inimigo.getEscudo() - this.getAtq() < 0)
            {
                inimigo.setEscudo(0);
            }
            else
            {
                inimigo.setEscudo(inimigo.getEscudo() - this.getAtq());
            }
            if (ataque < 0)
            {
                ataque = 0;
            }
            System.out.println("Ataque bem sucedido contra o inimigo!");
            System.out.format("O inimigo se defendeu com seus %d pontos de defesa e %d pontos de escudo, o ataque infligiu %d de dano!\n",
                inimigo.getDef(), inimigo.getEscudo(), ataque);
            inimigo.setHp(inimigo.getHp() - ataque);  
        }
    }
    
    public void defender() 
    {
        linha();
        this.setEscudo(this.getEscudo() + 10);
        System.out.println("O herói se defendeu e ganhou +10 de escudo!");
    }
    
    public void pocao() 
    {
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
        System.out.println("[1] Guerreiro\n[2] Mago\nQue classe deseja escolher?");
        Scanner input = new Scanner(System.in);
        int opcaoClasse = 0;

        do {
            opcaoClasse = input.nextInt();
        } while (opcaoClasse != 1 && opcaoClasse != 2);
        
        if (opcaoClasse == 1)
        {
            this.setClasse('g');
        }
        else if (opcaoClasse == 2)
        {
            this.setClasse('m');
        }
    }
    
    public void status()
    {
        linha();
        System.out.format("Herói:\nVida: %d\nEscudo %d\n", this.getHp(), this.getEscudo());
        linha();
    }
    
    public void statusInit() 
    
    {
        linha();
        System.out.format("Herói:\nClasse: %c\nVida: %d\nAtaque: %d\nAtaque especial: %d\nDefesa: %d\nDefesa especial: %d\n"
            + "Experiência: %d\nNível: %d\nMoedas: %d\nQuantidade de Poções: %d\n",
            this.getClasse(), this.getHp(), this.getAtq(), this.getSp_atq(), this.getDef(), this.getSp_def(), this.getExp(),
            this.getNivel(), this.getMoeda(), this.getPocao());
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

    public int getEscudo() {
        return escudo;
    }

    public void setEscudo(int escudo) {
        this.escudo = escudo;
    }
    
}
