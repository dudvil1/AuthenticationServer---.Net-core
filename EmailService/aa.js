using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

public class JsonValidator
{
    public static T DeserializeAndValidate<T>(string jsonString, params string[] fieldNames)
    {
        try
        {
            var settings = new JsonSerializerSettings
            {
                Converters = { new CustomDateTimeConverter(fieldNames) },
                // Add other settings if needed
            };

            return JsonConvert.DeserializeObject<T>(jsonString, settings);
        }
        catch (JsonSerializationException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            // Handle the error as needed
            return default(T); // Or throw an exception, return a specific value, etc.
        }
    }
}

public class CustomDateTimeConverter : JsonConverter<DateTime>
{
    private readonly string[] fieldNames;

    public CustomDateTimeConverter(string[] fieldNames)
    {
        this.fieldNames = fieldNames;
    }

    public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Float || reader.TokenType == JsonToken.Integer)
        {
            throw new JsonSerializationException($"Invalid date format for field(s) '{string.Join(", ", fieldNames)}'. Expected string but got {reader.Value}");
        }

        if (reader.TokenType == JsonToken.String)
        {
            if (DateTime.TryParse(reader.Value.ToString(), out DateTime result))
            {
                return result;
            }
            else
            {
                throw new JsonSerializationException($"Invalid date format for field(s) '{string.Join(", ", fieldNames)}'. Unable to parse: {reader.Value}");
            }
        }

        throw new JsonSerializationException($"Unexpected token type: {reader.TokenType}");
    }

    public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}

public class YourClass
{
    public DateTime YourDateTimeField { get; set; }

    // Other fields in YourClass
}

class Program
{
    static void Main()
    {
        string jsonString = "{ \"YourDateTimeField\": \"1.5\", \"OtherField\": \"someValue\" }";

        YourClass deserializedObject = JsonValidator.DeserializeAndValidate<YourClass>(jsonString, "YourDateTimeField", "OtherField");

        if (deserializedObject != null)
        {
            Console.WriteLine(deserializedObject.YourDateTimeField);
        }
    }
}
a