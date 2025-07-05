package com.mycompany.bibliotecavirtual;

import java.util.ArrayList;

public class Biblioteca {
    
    private final ArrayList<ItemBiblioteca>itens;
    
    public Biblioteca() {
        itens = new ArrayList<>();
    }       
    
    public void cadastrarItem(ItemBiblioteca item)
    {
        itens.add(item);
        System.out.println(item.titulo + "Adicionado com sucesso!");
    }
            
    public void listarItem()
    {
        for(ItemBiblioteca item:itens)
        {
            System.out.println(item);
        }
    }
    
    public ItemBiblioteca buscarItem(String titulo)
    {
        for(ItemBiblioteca item:itens)
        {
            if (item.titulo.equalsIgnoreCase(titulo))
            {
                return item;
            }
        }
        return null;
    }
}
