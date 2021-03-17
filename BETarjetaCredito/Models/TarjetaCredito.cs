using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BETarjetaCredito.Models
{
    public class TarjetaCredito
    {
        public int Id{ get; set; }
        [Required]
        public string Titular { get; set; }
        [Required]
        [StringLength(16, ErrorMessage = "El valor no puede ser diferente a 16 caracteres")]
        public string NoTarjeta { get; set; }
        [Required]
        [StringLength(5, ErrorMessage = "El valor no puede ser diferente a 5 caracteres")]
        public string FechaExp { get; set; }
        [Required]
        [StringLength(3, ErrorMessage = "El valor no puede ser diferente a 3 caracteres")]
        public string CVV { get; set; }
    }
}
