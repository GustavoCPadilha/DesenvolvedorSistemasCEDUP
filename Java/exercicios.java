package com.mycompany.gustavop;

import java.util.Scanner;

public class Gustavop {

    public static void main(String[] args) {
        exercicio1();
        exercicio2();
        exercicio3();
        exercicio4();
        exercicio5();
        exercicio6();
        exercicio7();
        exercicio8();

    }

    public static void exercicio1() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite seu nome: ");
        String nome = teclado.nextLine();
        System.out.println("Olá, " + nome);
    }

    public static void exercicio2() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois números para somar: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int soma = n1 + n2;
        System.out.printf("A soma de %d + %d é %d\n", n1, n2, soma);
    }

    public static void exercicio3() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois números para dividir: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int div = n1 / n2;
        System.out.printf("A divisão de %d por %d é %d\n", n1, n2, div);
    }

    public static void exercicio4() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite dois números para multiplicar: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int mult = n1 * n2;
        System.out.printf("A multiplicação de %d x %d é %d\n", n1, n2, mult);
    }

    public static void exercicio5() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite um número para ver a tabuada: ");
        int n = teclado.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d x %d = %d\n", n, i, n * i);
        }
    }

    public static void exercicio6() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite o raio do círculo: ");
        float raio = teclado.nextFloat();
        float perimetro = (float) (2 * 3.14159 * raio);
        float area = (float) (3.14159 * raio * raio);
        System.out.printf("O perímetro é = %.2f\nA área é = %.2f\n", perimetro, area);
    }

    public static void exercicio7() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Escreva três números para a média: ");
        int n1 = teclado.nextInt();
        int n2 = teclado.nextInt();
        int n3 = teclado.nextInt();
        float media = (n1 + n2 + n3) / 3f;
        System.out.println("A média dos números é " + media);
    }

    public static void exercicio8() {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Digite um número para n1: ");
        int n1 = teclado.nextInt();
        System.out.print("Digite um número para n2: ");
        int n2 = teclado.nextInt();
        int temp = n1;
        n1 = n2;
        n2 = temp;
        System.out.printf("O valor de n1 é %d e n2 é %d\n", n1, n2);
    }
}
