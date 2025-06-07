package com.mycompany.app;

import java.util.Scanner;
import java.util.Random;

public class App {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Random random = new Random();
        Heroi gustavo = new Heroi('m', 100, 20, 20, 10, 10, 0, 0, 0, 0); // classe, hp, atq, sp_atq, def, sp_def, exp, nivel, moeda, pocao
        Inimigo henrique = new Inimigo (100, 20, 20, 10, 10); // hp, atq, sp_atq, def, sp_def
        int opcaoMin = 1;
        int opcaoMax = 3;
        int opcaoAleatoria = random.nextInt((opcaoMax - opcaoMin) + 1) + opcaoMin; // Aleatoriedade entre as ações do inimigo
        
        System.out.println("[1] Guerreiro\n[2] Mago\nQue classe deseja escolher?");
        int opcaoClasse = 0;

        do {
            opcaoClasse = input.nextInt();
        } while (opcaoClasse != 1 || opcaoClasse != 2);
        
        if (opcaoClasse == 1)
        {
            gustavo.setClasse('g');
        }
        else if (opcaoClasse == 2)
        {
            gustavo.setClasse('m');
        }
        
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
            
            if (!gustavo.taVivo()) {
                System.out.println("Infelizmente nosso herói foi executado!");
                break;
            }
            
            gustavo.taVivo();
            henrique.taVivo();
            gustavo.status();
            henrique.status();
        }
    }
}
