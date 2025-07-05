package com.mycompany.bibliotecavirtual;

import java.util.ArrayList;
import java.util.Scanner;


public class Main 
{

    public static void main(String[] args) 
    {
        Biblioteca biblioteca = new Biblioteca();
        Scanner scanner = new Scanner(System.in);

        ArrayList<ItemBiblioteca> itensParaAdicionar = new ArrayList<>();

        itensParaAdicionar.add(new Livro(250, "O Hobbit", "J.R.R. Tolkien", true));
        itensParaAdicionar.add(new Livro(300, "Ensaio Sobre a Cegueira", "José Saramago", true));
        itensParaAdicionar.add(new Audiobook("Como Fazer Amigos e Influenciar Pessoas", "Dale Carnegie", true, 180.0f));
        itensParaAdicionar.add(new Audiobook("O Poder do Hábito", "Charles Duhigg", false, 210.0f));
        itensParaAdicionar.add(new Livro(180, "A Metamorfose", "Franz Kafka", true));
        
        for (ItemBiblioteca item : itensParaAdicionar) 
        {
            biblioteca.cadastrarItem(item);
        }
        int opcao = 0;

        System.out.println("== BEM-VINDO À BIBLIOTECA VIRTUAL ==");

        while (opcao != 6) 
        {
            System.out.println("\n===== MENU =====");
            System.out.println("1. Cadastrar item");
            System.out.println("2. Listar itens");
            System.out.println("3. Emprestar item");
            System.out.println("4. Devolver item");
            System.out.println("5. Buscar item");
            System.out.println("6. Sair");
            System.out.print("Escolha uma opção: ");

            opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) 
            {
                case 1 -> 
                {
                    System.out.println("== Cadastro de Item ==");
                    System.out.print("Tipo (L para Livro / A para Audiobook): ");
                    String tipo = scanner.next().trim().toUpperCase();
                    scanner.nextLine();

                    System.out.print("Título: ");
                    String titulo = scanner.nextLine();
                    scanner.nextLine();
                    System.out.print("Autor: ");
                    String autor = scanner.nextLine();
                    scanner.nextLine();

                switch (tipo) 
                {
                    case "L" -> 
                    {
                        System.out.print("Número de páginas: ");
                        int paginas = scanner.nextInt();
                        scanner.nextLine();
                        biblioteca.cadastrarItem(new Livro(paginas, titulo, autor, true));
                    }
                    case "A" -> 
                    {
                        System.out.print("Duração (em minutos): ");
                        float duracao = scanner.nextFloat();
                        scanner.nextLine();
                        biblioteca.cadastrarItem(new Audiobook(titulo, autor, true, duracao));
                    }
                    default -> System.out.println("Tipo inválido.");
                    }
                }

                case 2 -> 
                {
                    System.out.println("== Listagem de Itens ==");
                    biblioteca.listarItem();
                }

                case 3 -> 
                {
                    System.out.print("Digite o título do item para emprestar: ");
                    String tituloEmprestar = scanner.nextLine();
                    ItemBiblioteca itemEmprestar = biblioteca.buscarItem(tituloEmprestar);
                    if (itemEmprestar != null) 
                    {
                        itemEmprestar.emprestar();
                    } 
                    else 
                    {
                        System.out.println("Item não encontrado.");
                    }
                }

                case 4 -> 
                {
                    System.out.print("Digite o título do item para devolver: ");
                    String tituloDevolver = scanner.nextLine();
                    ItemBiblioteca itemDevolver = biblioteca.buscarItem(tituloDevolver);
                    if (itemDevolver != null) 
                    {
                        itemDevolver.devolver();
                    } 
                    else 
                    {
                        System.out.println("Item não encontrado.");
                    }
                }

                case 5 -> 
                {
                    System.out.print("Digite o título do item para buscar: ");
                    String tituloBusca = scanner.nextLine();
                    ItemBiblioteca encontrado = biblioteca.buscarItem(tituloBusca);
                    if (encontrado != null) 
                    {
                        System.out.println("Item encontrado: " + encontrado);
                    } 
                    else 
                    {
                        System.out.println("Item não encontrado.");
                    }
                }

                case 6 -> System.out.println("Encerrando o sistema. Até logo!");

                default -> System.out.println("Opção inválida. Tente novamente.");
            }
        }
        
        scanner.close();
    }
}
