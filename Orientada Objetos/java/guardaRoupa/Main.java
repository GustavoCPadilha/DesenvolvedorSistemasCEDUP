package gustavo.guardaroupa;


import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        GuardaRoupa guardaRoupa = new GuardaRoupa();
        Scanner scanner = new Scanner(System.in);
        boolean exit = false;

        ArrayList<ItemGuardaRoupa> itensParaAdicionar = new ArrayList<>();
        itensParaAdicionar.add(new Tenis("Adidas", "Preto", "38", "Couro"));
        itensParaAdicionar.add(new Camiseta(true, true, true, "Oceano", "Azul", "G", "Algodão"));
        itensParaAdicionar.add(new Calcado("Havaianas", "Amarelo", "40", "Borracha Microporosa"));
        itensParaAdicionar.add(new Camiseta(false, true, false, "Nike", "Rosa", "P", "Algodão"));
        itensParaAdicionar.add(new Tenis("Puma", "Branco", "36", "Tecido"));

        for (ItemGuardaRoupa item : itensParaAdicionar) {
            guardaRoupa.cadastrarItem(item);
        }

        System.out.println("== BEM-VINDO AO GUARDA ROUPA VIRTUAL ==");

        while (!exit) {
            System.out.println("""
                               ------------------------------
                               1. Cadastrar novo item
                               2. Listar itens
                               3. Buscar item por marca
                               4. Usar item
                               5. Tirar item
                               6. Lavar item
                               0. Sair
                               ------------------------------
                               Escolha uma opção:
                               """);

            int option = scanner.nextInt();
            scanner.nextLine();

            switch (option) {
                case 1 -> {
                    System.out.println("== Cadastro de Item ==");
                    System.out.print("Tipo (1 para camiseta / 2 para calçado): ");
                    int tipo = scanner.nextInt();
                    scanner.nextLine();

                    System.out.print("Marca: ");
                    String marca = scanner.nextLine();

                    System.out.print("Cor: ");
                    String cor = scanner.nextLine();

                    System.out.print("Tamanho: ");
                    String tamanho = scanner.nextLine();

                    System.out.print("Material: ");
                    String material = scanner.nextLine();

                    if (tipo == 1) {
                        System.out.print("Tem gola V? (1 para sim / 2 para não): ");
                        boolean golaV = scanner.nextInt() == 1;

                        System.out.print("Tem estampa? (1 para sim / 2 para não): ");
                        boolean estampa = scanner.nextInt() == 1;

                        System.out.print("Tem manga longa? (1 para sim / 2 para não): ");
                        boolean mangaLonga = scanner.nextInt() == 1;

                        Camiseta camiseta = new Camiseta(golaV, estampa, mangaLonga, marca, cor, tamanho, material);
                        guardaRoupa.cadastrarItem(camiseta);
                    } else if (tipo == 2) {
                        System.out.print("É um tênis? (1 para sim / 2 para não): ");
                        int tipoCalcado = scanner.nextInt();

                        ItemGuardaRoupa calcado;
                        if (tipoCalcado == 1) {
                            calcado = new Tenis(marca, cor, tamanho, material);
                        } else {
                            calcado = new Calcado(marca, cor, tamanho, material);
                        }

                        guardaRoupa.cadastrarItem(calcado);
                    } else {
                        System.out.println("Tipo inválido.");
                    }
                }

                case 2 -> {
                    System.out.println("== Lista de Itens ==");
                    guardaRoupa.listarItem();
                }

                case 3 -> {
                    System.out.print("Digite a marca para buscar: ");
                    String marcaBusca = scanner.nextLine();
                    ItemGuardaRoupa item = guardaRoupa.buscarItem(marcaBusca);
                    if (item != null) {
                        System.out.println("Item encontrado:");
                        System.out.println("Marca: " + item.getMarca());
                        System.out.println("Cor: " + item.getCor());
                        System.out.println("Tamanho: " + item.getTamanho());
                        System.out.println("Material: " + item.getMaterial());
                        System.out.println("Está sujo: " + item.isSuja());
                        System.out.println("Está sendo usado: " + item.isUsando());
                    } else {
                        System.out.println("Item não encontrado.");
                    }
                }

                case 4 -> {
                    System.out.print("Digite a marca do item para usar: ");
                    String marcaUsar = scanner.nextLine();
                    ItemGuardaRoupa item = guardaRoupa.buscarItem(marcaUsar);
                    if (item != null) item.usar();
                    else System.out.println("Item não encontrado.");
                }

                case 5 -> {
                    System.out.print("Digite a marca do item para tirar: ");
                    String marcaTirar = scanner.nextLine();
                    ItemGuardaRoupa item = guardaRoupa.buscarItem(marcaTirar);
                    if (item != null) item.tirar();
                    else System.out.println("Item não encontrado.");
                }

                case 6 -> {
                    System.out.print("Digite a marca do item para lavar: ");
                    String marcaLavar = scanner.nextLine();
                    ItemGuardaRoupa item = guardaRoupa.buscarItem(marcaLavar);
                    if (item != null) item.lavar();
                    else System.out.println("Item não encontrado.");
                }

                case 0 -> {
                    exit = true;
                    System.out.println("Saindo... Até mais!");
                }

                default -> System.out.println("Opção inválida! Tente novamente.");
            }
        }
        scanner.close();
    }
}