package com.mycompany.avaliacaopoo2_exercicio_2;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        GuardaRoupa guardaRoupa = new GuardaRoupa();
        Scanner scanner = new Scanner(System.in);
        boolean exit = false;
        
        ArrayList<ItemGuardaRoupa> itensParaAdicionar = new ArrayList<>();

        itensParaAdicionar.add(new Tenis("Adidas", "Preto", "38", "Couro"));
        itensParaAdicionar.add(new Camiseta(true, true, true, "Oceano", "Azul", "G", "Algodão"));
        itensParaAdicionar.add(new Calcado("Havaianas", "Amarelo", "40", "Borracha Microporosa"));
        itensParaAdicionar.add(new Camiseta(false, true, false, "Nike", "Rosa", "P", "Algodão"));
        itensParaAdicionar.add(new Tenis("Puma", "Branco", "36", "Tecido"));
        
        for (ItemGuardaRoupa item : itensParaAdicionar) 
        {
            guardaRoupa.cadastrarItem(item);
        }
        int option = 0;

        System.out.println("== BEM-VINDO AO GUARDA ROUPA VIRTUAL ==");
        
        
        while (!exit)
        {
            System.out.println("""
                               """);
            
            option = scanner.nextInt();
            scanner.nextLine();
            
            switch (option)
            {
                case 1 -> 
                    {
                        System.out.println("== Cadastro de Item ==");
                        System.out.print("Tipo (1 para camiseta / 2 para calçado): ");
                        int tipo = scanner.nextInt();
                        scanner.nextLine();

                        System.out.print("Marca: ");
                        String marca = scanner.nextLine();
                        scanner.nextLine();
                        
                        System.out.print("Cor: ");
                        String cor = scanner.nextLine();
                        scanner.nextLine();
                        
                        System.out.print("Tamanho: ");
                        String tamanho = scanner.nextLine();
                        scanner.nextLine();
                        
                        System.out.print("Material: ");
                        String material = scanner.nextLine();
                        scanner.nextLine();

                    switch (tipo) 
                    {
                        case 1 -> 
                        {
                            System.out.print("Tem gola V? (Digite 1 se sim e 2 se não)");
                            int temGola = scanner.nextInt();
                            boolean golaV = false;
                            switch (temGola)
                            {
                                case 1 -> golaV = true;
                                case 2 -> golaV = false;
                                default -> System.out.println("Opção inválida! Tente novamente.");
                            }
                            scanner.nextLine();
                            
                            System.out.print("Tem estampa? (Digite 1 se sim e 2 se não)");
                            int temEstampa = scanner.nextInt();
                            boolean estampa = false;
                            switch (temEstampa)
                            {
                                case 1 -> estampa = true;
                                case 2 -> estampa = false;
                                default -> System.out.println("Opção inválida! Tente novamente.");
                            }
                            scanner.nextLine();
                            
                            System.out.print("Tem manga longa? (Digite 1 se sim e 2 se não)");
                            int temMangaLonga = scanner.nextInt();
                            boolean mangaLonga = false;
                            switch (temMangaLonga)
                            {
                                case 1 -> mangaLonga = true;
                                case 2 -> mangaLonga = false;
                                default -> System.out.println("Opção inválida! Tente novamente.");
                            }
                            scanner.nextLine();
                            GuardaRoupa.cadastrarItem(new Camiseta(golaV, estampa, mangaLonga, marca, cor, tamanho, material));
                        }
                        case 2 -> 
                        {
                            System.out.print("O seu calçado é um tênis? (1 para sim 2 para não): ");            
                        }
                    }
                }
            }
        }
    }
}
