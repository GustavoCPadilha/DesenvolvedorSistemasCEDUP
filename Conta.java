package com.mycompany.atividade;


public class Conta {
    private float saldo;
    
    public Conta(){
        this.saldo = 0f;
    }
    
    public void sacar(float valor){
        if (valor <= this.getSaldo() && valor >= 0){
            this.setSaldo(this.getSaldo() - valor);
        }
    }
    
    public void depositar(float valor){
        if (valor > 0){
            this.setSaldo(this.getSaldo() + valor);
        }
    }
    
    public void status(){
        System.out.format("O saldo na conta é de: %.2f\n", getSaldo());
    }

    public float getSaldo() {
        return saldo;
    }

    public void setSaldo(float saldo) {
        this.saldo = saldo;
    }
}
