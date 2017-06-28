namespace AngularTutorial1.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularTutorial1.Models.AmazingTodoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "AngularTutorial1.Models.AmazingTodoContext";
        }

        protected override void Seed(AngularTutorial1.Models.AmazingTodoContext context)
        {
            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(o => new TodoItem
            {
                DueDate = new DateTime(2012, r.Next(1, 12), r.Next(1, 28)),
                Priority = (byte)r.Next(10),
                Todo = o.ToString()
            }).ToArray();
            context.TodoItems.AddOrUpdate(item => new { item.Todo }, items);
        }
    }
}
