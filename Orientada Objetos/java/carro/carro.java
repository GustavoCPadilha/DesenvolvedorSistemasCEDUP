package com.mycompany.carro;


public class Carro {
    String marca;
    String modelo;
    boolean ligado;
    int velocidade;
    
    void acelerar()
    {
        if (this.ligado == true)
        {
            System.out.println("Acelerando!");
            this.velocidade += 10;            
        }
        else
        {
            System.out.println("Primeiro você precisa ligar o carro!");
        }
    }
    
    void frear()
    {
        if (this.ligado == true)
        {
            if (this.velocidade == 0)
            {
                System.out.println("O carro já está parado!");
            }
            else
            {
                System.out.println("Freiando!");
                this.velocidade -= 10;                   
            }         
        }
        else
        {
            System.out.println("Primeiro você precisa ligar o carro!");
        }
    }
    
    
    void ligar()
    {
        if (this.ligado == true)
        {
            System.out.println("O carro já está ligado!");
        }
        else
        {
            System.out.println("Carro ligado com sucesso!");
            this.ligado = true;
        }       
    }
    
    void desligar()
    {
        if (this.ligado == false)
        {
            System.out.println("O carro já está desligado!");
        }
        else
        {
            System.out.println("Carro desligado com sucesso!");
            this.ligado = false;
        }
    }
    
    void verificaVelocidade()
    {
        System.out.format("Velocidade atual: %dKM/h\n", velocidade);
    }
}
