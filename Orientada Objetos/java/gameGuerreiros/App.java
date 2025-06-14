package com.mycompany.app;

import java.util.Scanner;
import java.util.Random;

public class App {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Random random = new Random();
        Heroi gustavo = new Heroi();
        Inimigo henrique = new Inimigo (100, 20, 20, 10, 10); //hp, atq, sp_atq, def, sp_def
        int opcaoMin = 1;
        int opcaoMax = 3;
        int opcaoAleatoria = random.nextInt((opcaoMax - opcaoMin) + 1) + opcaoMin; // Aleatoriedade entre as ações do inimigo
                
        gustavo.statusInit();
        henrique.statusInit();
            
        while (true)
        {
            System.out.print("[1] Atacar\n[2] Defender\n[3] Usar opção\nO que fazer contra seu inimigo? ");
            int opcao = input.nextInt();
            
            // Jogador 1
            switch (opcao)
            {
                case 1:
                    gustavo.atacar(henrique);
                    break;
                    
                case 2:
                    gustavo.defender();
                    break;
                
                case 3:
                    gustavo.pocao();
                    break;
                    
                default:
                    System.out.println("Ação Inválida!");
                    break;
            }          
            
            // Jogador 2
            switch(opcaoAleatoria)
            {
                case 1:
                    henrique.atacar(gustavo);
                    break;
                    
            }
            
            if (!gustavo.taVivo()) 
            {
                System.out.println("GAME OVER! Infelizmente nosso herói foi executado!");
                break;
            }
            if (!henrique.taVivo(gustavo)) // O herói vai como parâmetro pra ganhar moedas assim que vencer
            {
                System.out.println("VOCÊ VENCEU! O inimigo foi executado!");
                System.out.println("Parabéns, você recebeu 10 moedas de ouro!");
                break;
            }
            gustavo.status();
            henrique.status();
        }
    }
}
