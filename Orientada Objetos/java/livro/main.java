package com.mycompany.livro;

import java.util.Scanner;

public class Ex03 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Livro percyJackson = new Livro();
        percyJackson.autor = "Rick Riordan";
        percyJackson.titulo = "Percy Jackson e os Olimpianos";
        percyJackson.paginas = 384;
        percyJackson.disponivel = true;
        int opcao = 0;
        
        while (opcao != 3)
        {
            System.out.println("[0]Emprestar\n[1]Devolver\n[2]Verificar\n[3]Sair\nO que deseja fazer? ");
            opcao = input.nextInt();
            switch (opcao)
            {
                case 0:
                    percyJackson.emprestar();
                    break;
                    
                case 1:
                    percyJackson.devolver();
                    break;
                    
                case 2:
                    percyJackson.verificar();
                    break;
                
                case 3:
                    break;
                    
                default:
                    System.out.println("Opção Inválida!");
                    break;
            }
        }
    }
}
