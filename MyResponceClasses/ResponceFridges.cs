namespace WebApiFridges.CLIENT.MyResponceClasses
{
    public class ResponceFridges
    {
        public Guid Guid { get; set; }
        public string Model {  get; set; }
        public Guid ModelGuid { get; set; }
        public string Name { get; set; }
        public int? Year { get; set; }
        public string? OwnerName { get; set; }
    }
}
