package com.mycompany.atividade;


public class Atividade {

    public static void main(String[] args) {
        Conta pudim = new Conta();
        pudim.depositar(300.50f);
        pudim.sacar(-350);        
        pudim.status();
    }
}
