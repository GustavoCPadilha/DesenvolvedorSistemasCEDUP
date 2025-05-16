/*
4) Crie uma classe chamada “Retângulo” que possua atributos para
armazenar a largura e a altura. Implemente métodos para calcular a
área e o perímetro do retângulo;
*/

package com.mycompany.ex04;


public class Ex04 {

    public static void main(String[] args) {
        Retangulo retangulo = new Retangulo();
        retangulo.altura = 3f;
        retangulo.largura = 5f;
        float area = retangulo.area();
        float perimetro = retangulo.perimetro();
        System.out.format("Área = %.2fcm²\nPerímetro = %.2fcm\n", area, perimetro);
    }
}
