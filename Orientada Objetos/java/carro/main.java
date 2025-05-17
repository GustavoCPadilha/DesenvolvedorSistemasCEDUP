/*
5) Implemente uma classe chamada “Carro” com atributos para
armazenar a marca, o modelo, se está ligado ou desligado e a
velocidade atual do carro. Adicione métodos para acelerar, frear,
ligar, desligar e exibir a velocidade atual.
*/
package com.mycompany.ex05;

import java.util.Scanner;

public class Ex05 {

    public static void main(String[] args) 
    {
        Scanner input = new Scanner(System.in);
        Carro meu_carro = new Carro();
        meu_carro.marca = "Fiat";
        meu_carro.modelo = "Uno";
        meu_carro.ligado = false;
        meu_carro.velocidade = 0;
        int opcao = 0;
        
        while (opcao != 5)
        {
            System.out.print("[0]Acelerar\n[1]Frear\n[2]Ligar\n[3]Desligar\n[4]Verificar a velocidade\n[5]Sair\nDigite sua opção: ");
            opcao = input.nextInt();
            
            switch (opcao)
            {
                case 0:
                    meu_carro.acelerar();
                    break;
                    
                case 1:
                    meu_carro.frear();
                    break;
                    
                case 2:
                    meu_carro.ligar();
                    break;
                    
                case 3:
                    meu_carro.desligar();
                    break;
                    
                case 4:
                    meu_carro.verificaVelocidade();
                    break;
                    
                case 5:
                    break;
                    
                default:
                    System.out.println("Opção Inválida!");
                    break;
            }
        }
    }
}
