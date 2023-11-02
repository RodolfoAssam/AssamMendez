package main

import (
	"fmt"
	"unicode"
)

func main() {
	// Cambia el nombre del archivo por el que deseas analizar
	palabraejemplo := "El Numero De Rodolfo Termina En 47"
	// Lee el contenido del archivo
	content := palabraejemplo
	// Inicializa contadores
	uppercaseCount := 0
	lowercaseCount := 0

	// Analiza el contenido del archivo
	for _, char := range string(content) {
		if unicode.IsUpper(char) {
			uppercaseCount++
		} else if unicode.IsLower(char) {
			lowercaseCount++
		}
	}

	// Imprime los resultados
	fmt.Printf("Letras mayúsculas: %d\n", uppercaseCount)
	fmt.Printf("Letras minúsculas: %d\n", lowercaseCount)
}
