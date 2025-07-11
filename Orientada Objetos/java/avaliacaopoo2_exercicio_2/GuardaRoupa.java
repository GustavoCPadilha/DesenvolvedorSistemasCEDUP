package com.mycompany.avaliacaopoo2_exercicio_2;

import java.util.ArrayList;


public class GuardaRoupa {
    private final ArrayList<ItemGuardaRoupa>itens;
    
    public GuardaRoupa() {
        itens = new ArrayList<>();
    }       
    
    public void cadastrarItem(ItemGuardaRoupa item)
    {
        itens.add(item);
        System.out.println(item.marca + "Adicionado com sucesso!");
    }
            
    public void listarItem()
    {
        for(ItemGuardaRoupa item:itens)
        {
            System.out.println(item);
        }
    }
    
    public ItemGuardaRoupa buscarItem(String titulo)
    {
        for(ItemGuardaRoupa item:itens)
        {
            if (item.marca.equalsIgnoreCase(titulo))
            {
                return item;
            }
        }
        return null;
    }
}
