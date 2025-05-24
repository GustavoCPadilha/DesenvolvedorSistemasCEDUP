package com.mycompany.talkingtom;

import java.util.Scanner;

public class TalkingTom {

    public static void main(String[] args) {
        Pet pet = new Pet("Pudim", 70, 70, 70, 70);
        Scanner input = new Scanner(System.in);
        
        while (true)
        {
            pet.status();
            System.out.println("[1] Dormir\n[2] Comer\n[3] Brincar\n[4] Ir ao banheiro\n[5] Usar item\n[6] Comprar itens\nO que deseja fazer? ");
            int opcao = input.nextInt();
            switch (opcao)
            {
                case 1:
                    pet.dormir();
                    pet.ganharDinheiro();
                    break;
                    
                case 2:
                    pet.comer();
                    pet.ganharDinheiro();
                    break;
                    
                case 3:
                    pet.brincar();
                    pet.ganharDinheiro();
                    break;
                    
                case 4:
                    pet.banheiro();
                    pet.ganharDinheiro();
                    break;
                    
                case 5:
                    System.out.format("""
                                       Qual Item deseja utilizar?
                                       [1] Poção de sono (quantidade = %d)
                                       [2] Hamburgão (quantidade = %d)
                                       [3] Jogar um PS5 (quantidade = %d)
                                       [4] Poção da higiene (quantidade = %d)
                                       [5] Sair
                                       O que deseja fazer?""", pet.getQtdeItemSono(), pet.getQtdeItemFome(), 
                                       pet.getQtdeItemFelicidade(), pet.getQtdeItemHigiene());
                    opcao = input.nextInt();
                    switch (opcao)
                    {
                        case 1:
                            if (pet.getQtdeItemSono() > 0)
                            {
                                pet.setSono(100);
                            }
                            else
                            {
                                System.out.println("Você não possui este item!");
                            }
                            break;
                            
                        case 2:
                            if (pet.getQtdeItemFome() > 0)
                            {
                                pet.setFome(100);
                            }
                            else
                            {
                                System.out.println("Você não possui este item!"); 
                            }
                            break;
                            
                        case 3:
                            if (pet.getQtdeItemFelicidade() > 0)
                            {
                                pet.setFelicidade(100);
                            }
                            else
                            {
                                System.out.println("Você não possui este item!"); 
                            }
                            break;
                            
                        case 4:
                            if (pet.getQtdeItemHigiene() > 0)
                            {
                                pet.setHigiene(100);
                            }
                            else
                            {
                                System.out.println("Você não possui este item!"); 
                            }
                            break;
                            
                        case 5:
                            System.out.println("Saindo...");
                            break;
                            
                        default:
                            System.out.println("Opção inválida!");
                            break;
                    }
                    break;
                    
                case 6:
                    boolean temMoeda = pet.verificaMoeda();
                    System.out.println("""
                                       Custo unitário dos itens = 30 moedas
                                       [1] Poção de sono
                                       [2] Hamburgão
                                       [3] Jogar um PS5
                                       [4] Poção da higiene
                                       [5] Sair
                                       O que deseja fazer?""");
                    opcao = input.nextInt();
                    switch (opcao)
                    {
                        case 1:
                            
                            if (temMoeda == true)
                            {
                                pet.setQtdeItemSono(pet.getQtdeItemSono() + 1);
                                pet.setMoeda(pet.getMoeda() - 30);
                            }
                            else
                            {
                                System.out.println("Você não tem moedas suficientes!");
                            }
                            break;
                            
                        case 2:
                            if (temMoeda == true)
                            {
                                pet.setQtdeItemFome(pet.getQtdeItemFome() + 1);
                                pet.setMoeda(pet.getMoeda() - 30);
                            }
                            else
                            {
                                System.out.println("Você não tem moedas suficientes!");
                            }
                            break;
                            
                        case 3:
                            if (temMoeda == true)
                            {
                                pet.setQtdeItemFelicidade(pet.getQtdeItemFelicidade() + 1);
                                pet.setMoeda(pet.getMoeda() - 30);
                            }
                            else
                            {
                                System.out.println("Você não tem moedas suficientes!");
                            }
                            break;
                            
                        case 4:
                            if (temMoeda == true)
                            {
                                pet.setQtdeItemHigiene(pet.getQtdeItemHigiene() + 1);
                                pet.setMoeda(pet.getMoeda() - 30);
                            }
                            else
                            {
                                System.out.println("Você não tem moedas suficientes!");
                            }
                            break;
                            
                        case 5:
                            System.out.println("Saindo...");
                            break;
                            
                        default:
                            System.out.println("Opção Inválida!");
                            break;
                    }
            } 
            String motivo = pet.morte();
            if (!"suave".equals(motivo))
            {
                System.out.format("Meus pêsames, o %s morreu de %s!\n", pet.getNome(), motivo);
                break;
            }
        }
    }
}