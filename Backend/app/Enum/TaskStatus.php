<?php

namespace App\Enum;

enum TaskStatus: string
{
    case CONCLUDED = 'concluded';
    case ONGOING = 'ongoing';
    case PENDING = 'pending';

    public function label(): string
    {
        return match ($this) {
            self::CONCLUDED => 'Concluded',
            self::ONGOING => 'Ongoing',
            self::PENDING => 'Pending',
        };
    }
}
