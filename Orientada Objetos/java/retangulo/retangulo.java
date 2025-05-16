package com.mycompany.retangulo;


public class Retangulo {
    float largura;
    float altura;
    
    float area()
    {
        return largura * altura;
    }
    
    float perimetro()
    {
        return largura * 2 + altura * 2;
    }
}
