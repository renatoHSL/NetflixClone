import time
import numpy as np

# Usando a função sum do Python
array_python = list(range(1, 10000001))

start_time = time.time()
soma_python = sum(array_python)
end_time = time.time()
tempo_python = end_time - start_time

print(f"Soma usando a função sum do Python: {soma_python}")
print(f"Tempo de execução usando a função sum do Python: {tempo_python:.6f} segundos")

# Usando a função sum do NumPy
array_numpy = np.arange(1, 10000001)

start_time = time.time()
soma_numpy = np.sum(array_numpy)
end_time = time.time()
tempo_numpy = end_time - start_time

print(f"Soma usando a função sum do NumPy: {soma_numpy}")
print(f"Tempo de execução usando a função sum do NumPy: {tempo_numpy:.6f} segundos")
