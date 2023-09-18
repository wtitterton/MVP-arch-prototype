import { injectable } from "tsyringe";

export interface HttpGatewayResponse<T> {
  results: T;
  error: {
    message: string;
  } | null;
  success: boolean;
}

@injectable()
export class HttpGateway {
  get = async <T>(path: string, params = ""): Promise<HttpGatewayResponse<T>> => {
    try {
      const response = await fetch(
          `https://fakestoreapi.com/${path}${params}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        
        // Api should return and error but it doesn't
        if(data === null) {
          throw new Error("No data returned");
        }
        

        return {
          results: data  as T,
          error: null,
          success: true
        };
    } catch(error : any) {
        return {
          error: {
            message: error.message
          },
          results: [] as T,
          success: false
        }
    }
  }
  delete = async <T>(path: string, params = ""): Promise<HttpGatewayResponse<T>> => {
    try {
      const response = await fetch(
          `https://fakestoreapi.com/${path}${params}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        // Api should return and error but it doesn't
        if(data === null) {
          throw new Error("No data returned");
        }

        return {
          results: [data]  as T,
          error: null,
          success: true
        };
    } catch(error : any) {
        return {
          error: {
            message: error.message
          },
          results: [] as T,
          success: false
        }
    }
  }

  post = async <T, B>(path: string, body: B = {} as B): Promise<HttpGatewayResponse<T>> => {
    try {
      const response = await fetch(
          `https://fakestoreapi.com/${path}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
          }
        );

        const data = await response.json();
        
        // Api should return and error but it doesn't
        if(data === null) {
          throw new Error("No data returned");
        }
        

        return {
          results: data  as T,
          error: null,
          success: true
        };
    } catch(error : any) {
        return {
          error: {
            message: error.message
          },
          results: [] as T,
          success: false
        }
    }
  }
}