export class ImageService {
  static async preload(...srcs: string[]): Promise<void[]> {
    return Promise.all(
      srcs.map((src) => {
        const image = new Image();

        const promise = new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), {
            once: true,
          });

          image.addEventListener(
            'error',
            (event) => {
              console.error(`Failed to load image from "${src}"!`);
              resolve();
            },
            {
              once: true,
            }
          );
        });

        // Set the SRC here to prevent race conditions
        image.src = src;

        return promise;
      })
    );
  }
}
