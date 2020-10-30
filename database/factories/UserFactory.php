<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // return [
        //     'name' => $this->faker->name,
        //     'email' => $this->faker->unique()->safeEmail,
        //     'email_verified_at' => now(),
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //     'remember_token' => Str::random(10),
        // ];


        // TODO:

        $gender = $this->faker->randomElement(['Male', 'Female', 'Prefer not to say']);
        $dob = $this->faker->date($format = 'Y-m-d', $max = 'now');

        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
            'user_address' => $this->faker->address,
            'user_gender' => $gender,
            // 'user_dob' => $dob,
            'user_height' => 123,
            'user_weight' => 123,
        ];
    }
}

// $factory->define(App\Models\User::class, function (Faker $faker) {
//     return [
//         'first_name' => $faker->firstName,
//         'last_name' => $faker->lastName,
//         'email' => $faker->unqiue()->safeEmail,
//         'password' => $password ?: $password = bcrypt('secret'),
//         'user_address' => $faker->userAddress,
//         'user_gender' => $faker->gender,
//         'user_DOB' => $faker->DOB,
//         'user_height' => $faker->height,
//         'user_weigth' => $faker->weight,
//     ];
// });
