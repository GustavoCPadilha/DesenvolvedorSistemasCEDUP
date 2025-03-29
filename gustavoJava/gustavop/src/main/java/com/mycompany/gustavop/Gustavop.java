package com.mycompany.gustavop;

import java.util.Scanner;


public class Gustavop {

    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite um numero para n1: ");
        int n1 = teclado.nextInt();
        System.out.print("Digite um numero para n2: ");
        int n2 = teclado.nextInt();
        int n1_temporaria = n1;
        n1 = n2;
        n2 = n1_temporaria;
        System.out.printf("O valor de n1 e de %d e n2 e de %d", n1, n2);
    }
}

/*
EXERCÍCIO 1:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite seu nome: ");
        String nome = teclado.nextLine();
        System.out.println("Ola, " + nome);

EXERCÍCIO 2:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois numeros para somar: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int soma = n1 + n2;
        System.out.printf("A soma de %d + %d e de %d\n", n1, n2, soma);

EXERCÍCIO 3:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois numeros para dividir: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int div = n1 / n2;
        System.out.printf("A divisao de %d + %d e de %d\n", n1, n2, div);

EXERCÍCIO 4:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois numeros para multiplicar: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int mult = n1 * n2;
        System.out.printf("A multiplicacao de %d + %d e de %d\n", n1, n2, mult);

EXERCÍCIO 5:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite um numero para ver a tabuada: ");
        int n = teclado.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d X %d = %d\n", n, i, n * i);

EXERCÍCIO 6:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite o raio do circulo: ");
        float raio = teclado.nextFloat();
        float perimetro = (float) (2 * 3.14159 * raio);
        float area = (float) 3.14159 * (raio * raio);
        System.out.printf("O perimetro e = %f\nA area e = %f", perimetro, area);

EXERCÍCIO 7:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Escreva tres numeros para a media: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int n3 = teclado.nextInt();
        float media = (n1 + n2 + n3) / 3;
        System.out.println("A media dos numeros e " + media);

EXERCÍCIO 8:
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite um numero para n1: ");
        int n1 = teclado.nextInt();
        System.out.print("Digite um numero para n2: ");
        int n2 = teclado.nextInt();
        int n1_temporaria = n1;
        n1 = n2;
        n2 = n1_temporaria;
        System.out.printf("O valor de n1 e de %d e n2 e de %d", n1, n2);
*/  