package com.mycompany.gustavo;

import java.util.Scanner;
import java.util.Arrays;

public class Gustavo 
{
    public static void main(String[] args) 
    {
        Scanner input = new Scanner(System.in);
        int vetor[] = {1,2,3,4,5};
        System.out.println("A soma e de: " + somatorio(vetor));
        System.out.println("A media e de: " +  media(vetor));
        System.out.print("Digite a posicao desejada: ");
        int posicao = input.nextInt();
        obtemElementoVetor(vetor, posicao);
        System.out.print("Digite a posicao que deseja mudar o valor: ");
        posicao = input.nextInt();
        System.out.print("Que valor deseja inserir? ");
        int valor = input.nextInt();
        insereElementoVetor(vetor, posicao, valor);
        substituiImparPorZero(vetor);
        System.out.println("O valor do menor e de " + menor(vetor));
        imprimeVetor(vetor);
        
    }
    
    public static int somatorio(int[] vetor)
    {
        int soma = 0;
        for(int valor : vetor)
        {
            soma += valor;
        }
        return soma;
    }
    
    public static int media(int[] vetor) 
    {
        int soma = somatorio(vetor);
        return soma / vetor.length;
    }
    
    public static void obtemElementoVetor(int[] vetor, int posicao)
    {
        System.out.printf("A posicao %d e o numero %d\n", posicao, vetor[posicao]);
    }
    
    public static void insereElementoVetor(int[] vetor, int posicao, int valor)
    {
        vetor[posicao] = valor;
        System.out.println(Arrays.toString(vetor));
    }
    
    public static void substituiImparPorZero(int[] vetor)
    {
        int contador = 0;
        for(int valor : vetor)
        {
            if(valor % 2 == 0)
            {
                vetor[contador] = 0;
            }
            contador++;
        }
        System.out.println("Substituindo impar por zero..." + Arrays.toString(vetor));
    }
    
    public static int maior(int[] vetor)
    {
        int maior = 0;
        for (int i = 0; i < vetor.length; i++)
        {
            if (i == 0)
            {
                maior = vetor[i];
            }    
            else 
            {
                if (maior < vetor[i]){
                    maior = vetor[i];
                }
            }
        } 
        return maior;
    }
    
    public static int menor(int[] vetor)
    {
        int menor = 0;
        for (int i = 0; i < vetor.length; i++)
        {
            if (i == 0)
            {
                menor = vetor[i];
            }    
            else 
            {
                if (menor > vetor[i]){
                    menor = vetor[i];
                }
            }
        } 
        return menor;
    }
    
    public static void imprimeVetor(int[] vetor)
    {
        System.out.println(Arrays.toString(vetor));
    }
}
