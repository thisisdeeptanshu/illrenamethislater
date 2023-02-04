#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void print_help()
{
  printf("helped");
}

int main()
{
  int bytes_read;
  size_t max_size = 100;
  char* res = malloc(sizeof(char) * max_size);

  while (strcmp("exit", res) != 0)
  {
    if (strcmp(res, "") != 0) printf("%s\n", res);

    // Getting the string
    printf(">>> ");
    bytes_read = getline(&res, &max_size, stdin);
    if (bytes_read == -1)
    {
      printf("error :(\n");
      return 1;
    }
    res[strlen(res) - 1] = '\0';
  }
  free(res);
  return 0;
}
