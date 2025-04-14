package com.mycompany.gustavo;


public class Gustavo
{
    public static void main(String[] args) 
    {
        char matriz_alfabeto[][] = {{'a','b','c','d','e'},{'f','g','h','i','j'}, 
            {'l','m','n','o','p'}, {'q','r','s','t','u'}};
        int matriz_int[][] = {{19,25,100,99},{10,7,25,14},{35,2,47,74}};
        double matriz_float[][] = {{1.9,2.5,10.0},{1.0,7.8,2.5},{3.5,2.2,4.7}};
        
        exibeMatrizChar(matriz_alfabeto);
        System.out.println();
        exibeMatrizInt(matriz_int);
        System.out.println();
        exibeMatrizFloat(matriz_float);
    }
    
    public static void exibeMatrizChar(char[][] matriz)
    {
        for (char[] letra : matriz) {
            for (int x = 0; x <= matriz.length; x++) {
                System.out.print(" " + letra[x]);
            }
            System.out.println();
        }
    }
    
    public static void exibeMatrizInt(int[][] matriz)
    {
        for (int[] num : matriz) {
            for (int x = 0; x < matriz.length; x++) {
                System.out.print(" " + (num[x]));
            }
            System.out.println();
        }
    }
        
    public static void exibeMatrizFloat(double[][] matriz)
    {
        for (double[] num : matriz) {
            for (int x = 0; x < matriz.length; x++) {
                System.out.print(" " + (num[x]));
            }
            System.out.println();
        }
    }
}
