package sarah;

import java.util.Scanner;

public class Sarah {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);
        System.out.println("Com quantos salários você deseja entrar? ");
        int salario = teclado.nextInt();
        float soma = 0;
        for (int i = 0; i < salario; i++)
        {
            System.out.println("Qual o valor do salário? ");
            float valor = teclado.nextFloat();
            soma += valor;
        }
        System.out.printf("A média dos salários é: %.2f\n", soma/salario);

        System.out.println("Digite idade em anos, meses e dias");
        int anos_idade = teclado.nextInt();
        int meses_idade = teclado.nextInt();
        int dias_idade = teclado.nextInt();
        int dias = 0;
        dias += anos_idade * 365;
        dias += meses_idade * 30;
        dias += dias_idade;
        System.out.printf("%d anos, %d meses e %d dias = %d dias.\n", anos_idade, meses_idade, dias_idade, dias);
    }
}
